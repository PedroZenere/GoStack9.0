import * as Yup from 'yup'
import {
  parseISO,
  isBefore,
  isAfter,
  format,
  setSeconds,
  setMinutes,
  setHours,
  toDate,
} from 'date-fns'
import { Op } from 'sequelize'
import Deliveryman from '../models/Deliveryman'
import Orders from '../models/Orders'

class StatusOrdersController {
  async updateStart(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { idDeliveryman } = req.params

    const isDeliveryman = await Deliveryman.findByPk(idDeliveryman)

    if (!isDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists' })
    }

    const { id } = req.body

    const isOrder = await Orders.findByPk(id)

    if (!isOrder) {
      return res.status(400).json({ error: 'Invalid id Order' })
    }

    const order = await Orders.findOne({
      where: {
        id,
        deliveryman_id: idDeliveryman,
        canceled_at: null,
        start_date: null,
      },
    })
    // Validando datas
    // Verifica se uma entrega esta sendo colocada em uma data passada
    const { date } = req.query

    if (!date) {
      return res.status(400).status({ error: 'date not provided' })
    }

    const hourStart = format(toDate(Number(date)), "yyyy-MM-dd'T'HH:mm:ssxxx")

    const startHour = format(
      setSeconds(setMinutes(setHours(new Date(), 8), 0), 0),
      "yyyy-MM-dd'T'HH:mm:ssxxx"
    )
    // console.log('Hora: ', startHour)

    const endHour = format(
      setSeconds(setMinutes(setHours(new Date(), 18), 0), 0),
      "yyyy-MM-dd'T'HH:mm:ssxxx"
    )
    if (isAfter(parseISO(hourStart), parseISO(endHour))) {
      return res.status(400).json({ error: 'Start date out of interval' })
    }
    if (isBefore(parseISO(hourStart), parseISO(startHour))) {
      return res.status(400).json({ error: 'Start date out of interval' })
    }

    const start_date = hourStart
    const resOrder = await order.update({ id, start_date })

    return res.json(resOrder)
  }

  async updateEnd(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { idDeliveryman } = req.params

    const isDeliveryman = await Deliveryman.findByPk(idDeliveryman)

    if (!isDeliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists' })
    }

    const { id } = req.body

    const isOrder = await Orders.findByPk(id)

    if (!isOrder) {
      return res.status(400).json({ error: 'Invalid id Order' })
    }

    const order = await Orders.findOne({
      where: {
        id,
        deliveryman_id: idDeliveryman,
        canceled_at: null,
        start_date: { [Op.ne]: null },
        end_date: null,
      },
    })

    if (!order) {
      return res.status(400).json({ error: 'Order need of a start date' })
    }

    const { date } = req.query

    if (!date) {
      return res.status(400).status({ error: 'date not provided' })
    }
    const start_date = format(toDate(Number(date)), "yyyy-MM-dd'T'HH:mm:ssxxx")

    const resOrder = await order.update({ id, start_date })

    return res.json(resOrder)
  }
}

export default new StatusOrdersController()
