import * as Yup from 'yup'
import DeliveryProblems from '../models/DeliveryProblems'
import Orders from '../models/Orders'
import Deliveryman from '../models/Deliveryman'

class DeliveryProblemsController {
  async index(req, res) {
    const { idOrder } = req.params

    const deliveryProblem = await DeliveryProblems.findAll({
      where: { delivery_id: idOrder },
      include: [
        {
          model: Orders,
          attributes: ['id', 'recipient_id', 'deliveryman_id', 'product'],
        },
      ],
    })

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Order problem not found' })
    }

    return res.json(deliveryProblem)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      description: Yup.string().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const { idDeliveryman } = req.params

    const isDeliveryman = await Deliveryman.findByPk(idDeliveryman)

    if (!isDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' })
    }

    const { delivery_id } = req.body
    const isOrder = await Orders.findByPk(delivery_id)

    if (!isOrder) {
      return res.status(400).json({ error: 'Order not found' })
    }

    const delivery_problem = await DeliveryProblems.create(req.body)

    return res.json(delivery_problem)
  }

  async delete(req, res) {
    const { idProblem } = req.params

    const delivery_problem = await DeliveryProblems.findByPk(idProblem)

    const order = await Orders.findByPk(delivery_problem.delivery_id, {
      attributes: [
        'recipient_id',
        'deliveryman_id',
        'product',
        'start_date',
        'end_date',
      ],
    })

    order.canceled_at = new Date()

    await order.save()
    // TODO:
    // Enviar email para o deliveryman quando uma entrega for cancelada
    // Adicionar fila Redis aqui

    return res.json(order)
  }
}

export default new DeliveryProblemsController()
