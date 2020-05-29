import * as Yup from 'yup'
import Deliveryman from '../models/Deliveryman'
import File from '../models/File'

const verifyDeliveryExists = async (compEmail) => {
  return Deliveryman.findOne({ where: { email: compEmail } })
}

// TODO: Verificar se o token recebido é de um adm

class DeliverymanController {
  // Feito
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      attributes: ['name', 'email'],
      include: [
        {
          model: File,
          attributes: ['name', 'path', 'url'],
        },
      ],
    })
    return res.json(deliverymans)
  }

  // TODO: Colocar foto do entregador
  async store(req, res) {
    // Validando os dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.email().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed')
    }
    // Valida email
    const { email } = req.body

    const validEmail = await verifyDeliveryExists(email)

    if (!validEmail) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const { id, name } = await Deliveryman.create(req.body)
    return res.json({
      id,
      name,
      email,
    })
  }

  // Feito
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const { email } = req.body

    const deliveryman = await Deliveryman.findByPk(req.body.id)

    if (email) {
      if (email !== deliveryman.email) {
        const validEmail = await verifyDeliveryExists(email)

        if (validEmail) {
          return res.status(400).json({ error: 'Email already exists' })
        }
      }
    }

    const { id, name } = await Deliveryman.update(req.body)

    return res.json({
      id,
      name,
      email,
    })
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      include: [
        {
          attributes: ['name', 'email'],
        },
      ],
    })

    await Deliveryman.delete(deliveryman.id)

    return res.json(deliveryman)
  }
}

export default new DeliverymanController()
