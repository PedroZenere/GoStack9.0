import * as Yup from 'yup'
import { Op } from 'sequelize'
import Recipients from '../models/Recipients'
import Filesignature from '../models/Filesignature'

class RecipientsController {
  async index(req, res) {
    const { q } = req.query
    let recipients

    if (q) {
      recipients = await Recipients.findAll({
        where: {
          nome: { [Op.iLike]: `%${q}%` },
        },
        attributes: [
          'id',
          'nome',
          'rua',
          'numero',
          'complemento',
          'estado',
          'cidade',
          'cep',
        ],
        include: [
          {
            model: Filesignature,
            as: 'signature',
            attributes: ['id', 'path', 'url'],
          },
        ],
      })
    } else {
      recipients = await Recipients.findAll({
        attributes: [
          'id',
          'nome',
          'rua',
          'numero',
          'complemento',
          'estado',
          'cidade',
          'cep',
        ],
        include: [
          {
            model: Filesignature,
            as: 'signature',
            attributes: ['id', 'path', 'url'],
          },
        ],
      })
    }

    return res.json(recipients)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      rua: Yup.string().required(),
      numero: Yup.number().required(),
      complemento: Yup.string().required(),
      estado: Yup.string().required(),
      cidade: Yup.string().required(),
      cep: Yup.string().min(9).max(9),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' })
    }

    const {
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    } = await Recipients.create(req.body)

    return res.status(200).json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    })
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string(),
      rua: Yup.string(),
      numero: Yup.number(),
      complemento: Yup.string(),
      estado: Yup.string(),
      cidade: Yup.string(),
      cep: Yup.string(),
      signature_id: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation error.' })
    }

    const recipient = await Recipients.findOne({
      where: { id: req.params.id },
    })

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' })
    }

    const { signature_id } = req.body
    if (signature_id) {
      const findSignature = await Filesignature.findOne({
        where: { id: signature_id },
      })

      if (!findSignature) {
        return res.status(400).json({ error: 'Signature not found' })
      }
    }

    const {
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    } = await recipient.update(req.body)

    return res.json({
      id,
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
      signature_id,
    })
  }

  async delete(req, res) {
    const { id } = req.params

    const recipient = await Recipients.findByPk(id)

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' })
    }

    await Recipients.destroy({
      where: { id },
    })

    return res.json({ recipient })
  }
}

export default new RecipientsController()
