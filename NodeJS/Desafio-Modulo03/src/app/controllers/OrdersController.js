import * as Yup from 'yup'
import Orders from '../models/Orders'
import Recipients from '../models/Recipients'
import Deliveryman from '../models/Deliveryman'
import File from '../models/File'
import Filesignature from '../models/Filesignature'
import Mail from '../../lib/Mail'

class OrdersController {
  async index(req, res) {
    const { page = 1 } = req.query
    const orders = await Orders.findAll({
      where: { canceled_at: null },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'recipient_id', 'deliveryman_id', 'product'],
      include: [
        {
          model: Recipients,
          as: 'recipient',
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
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attribute: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    })

    return res.json(orders)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    // Checar se o id do recipient e do deliveryman existe
    const { recipient_id, deliveryman_id, product } = req.body

    const isRecipient = await Recipients.findOne({
      where: {
        id: recipient_id,
      },
    })

    const isDeliveryman = await Deliveryman.findOne({
      where: {
        id: deliveryman_id,
      },
    })

    if (!isRecipient) {
      return res.status(400).json({ error: 'Recipient not found.' })
    }

    if (!isDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' })
    }

    const orders = await Orders.create({
      recipient_id,
      deliveryman_id,
      product,
    })

    /* TODO: adicionar envio de emails */
    try {
      await Mail.sendMail({
        to: `${isDeliveryman.name} <${isDeliveryman.email}>`,
        subject: 'Novas Entregas',
        text:
          'Nova entrega cadastrada para você! Está disponível para retirada.',
      })
    } catch (err) {
      return res.status(401).json({ error: 'Send Mail error' })
    }

    return res.json(orders)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' })
    }

    const { id } = req.params.id

    const orders = await Orders.findByPk(id)

    if (!orders) {
      return res.status(400).json({ error: 'Order not found' })
    }

    // Checar se o id do recipient e do deliveryman existe
    const { recipient_id, deliveryman_id } = req.body

    const isRecipient = await Recipients.findOne({
      where: {
        id: recipient_id,
      },
    })

    const isDeliveryman = await Deliveryman.findOne({
      where: {
        id: deliveryman_id,
      },
    })

    if (!isRecipient) {
      return res.status(400).json({ error: 'Recipient not found.' })
    }

    if (!isDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found.' })
    }

    const orderAt = await orders.update(req.body)

    return res.json(orderAt)
  }

  async delete(req, res) {
    return res.json()
  }
}

export default new OrdersController()
