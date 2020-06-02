import * as Yup from 'yup'
import Deliveryman from '../models/Deliveryman'
import File from '../models/File'

const verifyDeliveryExists = async (compEmail) => {
  return Deliveryman.findOne({ where: { email: compEmail } })
}

class DeliverymanController {
  // Feito
  async index(req, res) {
    const deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    })
    return res.json(deliverymans)
  }

  /* TODO: Colocar foto do entregador: Resolvido: FileController adicionado.
    O avatar do entregador será feito pela requisição Files
    O relacionamento de Id's está sendo feito no index do DataBase
    O controller não precisa saber que isso está acontecendo
  */

  // Feito
  async store(req, res) {
    // Validando os dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json('Validation failed')
    }
    // Valida email
    const { email } = req.body

    const deliverymanExists = await verifyDeliveryExists(email)

    if (deliverymanExists) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const { id, name } = await Deliveryman.create(req.body)
    return res.json({
      id,
      name,
      email,
    })
  }

  /** Feito -- Não está alterando nome. Talvez mudar para procurar
  pelo id funcione
  */
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const { email } = req.body

    const deliveryman = await Deliveryman.findOne({
      where: { email },
    })

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' })
    }

    if (email) {
      if (email !== deliveryman.email) {
        const validEmail = await verifyDeliveryExists(email)
        if (validEmail) {
          return res.status(400).json({ error: 'Email already exists' })
        }
      }
    }

    // Verifica se ja existe o avatar a ser setado
    const { avatar_id } = req.body
    if (avatar_id) {
      const findAvatar = await File.findOne({
        where: { id: avatar_id },
      })

      if (!findAvatar) {
        return res.status(400).json({ error: 'Avatar not load' })
      }
    }

    const { id, name } = await deliveryman.update(req.body)

    return res.json({
      id,
      name,
      email,
    })
  }

  // Feito
  async delete(req, res) {
    const { id, name, email } = await Deliveryman.findByPk(req.params.id)

    await Deliveryman.destroy({
      where: { id },
    })

    return res.json({
      id,
      name,
      email,
    })
  }
}

export default new DeliverymanController()
