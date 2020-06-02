import * as Yup from 'yup'
import Orders from '../models/Orders'
import Recipients from '../models/Recipients'
import Deliveryman from '../models/Deliveryman'
import File from '../models/File'

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

  /**
{
            
           
   */

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

    /* TODO: adicionar envio de emails
                ''     checagem de datas            
    * */

    return res.json(orders)
  }

  async update(req, res) {
    return res.json()
  }

  async delete(req, res) {
    return res.json()
  }
}

export default new OrdersController()
