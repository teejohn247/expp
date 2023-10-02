// controllers/consultationController.ts
import { Request, Response } from 'express';
import { Consultation } from '../../models/consultation';
import HTTP_STATUS from 'http-status-codes';

const getAvailableTimeSlots = async (req: Request, res: Response) => {
  try {
    const { appointmentDate } = req.params;

		if(!appointmentDate){
			res.status(HTTP_STATUS.BAD_REQUEST).json({
				status: HTTP_STATUS.BAD_REQUEST,
				success: true,
				data: 'appointment date is compulsory'
		});
		return;
		}
    const appointmentDuration = 30 * 60 * 1000; // in milliseconds

    // Assuming appointments have a fixed duration of 30 minutes
    // const appointmentDuration = 30 * 60 * 1000; // in milliseconds

    const appointments = await Consultation.find({
      date: appointmentDate,
      status: 'scheduled',
    });

		console.log(appointments);
    // Generate time slots for the day
    const dayStart = new Date(appointmentDate);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(appointmentDate);
    dayEnd.setHours(23, 59, 59, 999);

    const allTimeSlots: Date[] = [];
    for (let time = dayStart.getTime(); time <= dayEnd.getTime(); time += appointmentDuration) {
      allTimeSlots.push(new Date(time));
    }

    // Filter out booked time slots
    const availableTimeSlots = allTimeSlots.filter((slot) => {
      const slotEnd = new Date(slot.getTime() + appointmentDuration);
      return !appointments.some(
        (appointment) =>
          (slot.getTime() >= new Date(appointment?.time as string).getTime() &&
            slot.getTime() < new Date(appointment?.time as string).getTime() + appointmentDuration) ||
          (slotEnd.getTime() > new Date(appointment?.time as string).getTime() &&
            slotEnd.getTime() <= new Date(appointment?.time as string).getTime() + appointmentDuration)
      );
    });

    // Format available time slots to return
    const formattedTimeSlots = availableTimeSlots.map((slot) => {
      return {
        time: slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    });


		res.status(HTTP_STATUS.OK).json({
			status: HTTP_STATUS.OK,
			success: true,
			availableTimeSlots: formattedTimeSlots,
	});
	return;

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAvailableTimeSlots };
