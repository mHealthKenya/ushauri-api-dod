const express = require("express");
const router = express.Router();
const _ = require("lodash");
const {
    Client
} = require("../../models/client");
const {
    Appointment
} = require("../../models/appointment");
const {
    AppointmentType
} = require("../../models/appointment_type");

router.post("/check/consent", async(req, res) => {
    let client = await Client.findOne({
        attributes: [
            "mfl_code",
            "clinic_number",
            "f_name",
            "phone_no",
            "smsenable",
        ],
        where: {
            mfl_code: req.body.mfl_code,
            clinic_number: req.body.ccc_number,
            status: "Active",
        },
    });

    return res.status(200).send(client);
});

router.post("/list/clients", async(req, res) => {
    let clients = await Client.findAll({
        attributes: [
            "mfl_code",
            "clinic_number",
            "f_name",
            "m_name",
            "l_name",
            "phone_no",
            "smsenable",
            "enrollment_date",
            "art_date",
        ],
        where: {
            mfl_code: parseInt(req.body.mfl_code),
            status: "Active",
        },
    });

    res.json({
        success: true,
        clients,
    });
});

router.post("/get/one/client", async(req, res) => {
    let clients = await Client.findAll({
        attributes: [
            "mfl_code",
            "clinic_number",
            "f_name",
            "m_name",
            "l_name",
            "phone_no",
            "smsenable",
            "enrollment_date",
            'client_status',
            'art_date',
        ],
        where: {
            clinic_number: parseInt(req.body.ccc_number),
            status: "Active",
        },
    });
    if (!clients) {
        clients = [];
    }
    res.json({
        success: true,
        clients,
    });
});

router.post("/get/appointments", async(req, res) => {
    let client = await Client.findOne({
        where: {
            clinic_number: parseInt(req.body.ccc_number),
            status: 'Active',
        },
        attributes: [
            "id",
            'f_name',
            'm_name',
            'l_name',
        ],
    })
    if (client) {
        // let toSend = {...client }
        let appointments = await Appointment.findAll({
            where: {
                client_id: client.id,
            },
            include: [{
                model: AppointmentType,
                as: 'app_type',
                attributes: ['name'],
            }],
            attributes: [
                'id',
                'appntmnt_date',
                'app_status',
                'visit_type',

            ],
        })
        if (appointments != 0) {
            // toSend.appointments = appointments
            res.json({
                success: true,
                client: {
                    client,
                    appointments
                },
            })
        } else {
            res.json({
                success: false,
                message: "There are no appointments for this client",
            })

        }
    } else if (!client) {
        res.json({
            success: false,
            message: "Client does not exist in the system"
        })
    }

})

router.post("/get/pmtct/dependants", async(req, res) => {
    let client = await Client.findOne({
        where: {
            clinic_number: parseInt(req.body.ccc_number),
            status: 'Active',
        },
        attributes: [
            "id",
            'f_name',
            'm_name',
            'l_name',
        ],
    })
    if (client) {
        let pmtct = await PMTCTModule.findAll({
            where: {
                client_id: client.id,
            },
            include: [{
                model: AppointmentType,
                as: 'app_type',
                attributes: ['name'],
            }],
            attributes: [
                'id',
                'appntmnt_date',
                'app_status',
                'visit_type',

            ],
        })
        if (pmtct != 0) {
            // toSend.appointments = appointments
            res.json({
                success: true,
                client: {
                    client,
                    pmtct
                },
            })
        } else {
            res.json({
                success: false,
                message: "There are no dependants on pmtct module for this client",
            })

        }
    } else if (!client) {
        res.json({
            success: false,
            message: "Client does not exist in the system"
        })
    }

})

router.post("/appointment/reschedule", async(req, res) => {
    let client = await Client.findOne({
        where: {
            clinic_number: parseInt(req.body.ccc_number),
            status: 'Active',
        },
        attributes: [
            "id",
            'f_name',
            'm_name',
            'l_name',
        ],
    })
    if (client) {
        // get booked appointment
        if (pmtct != 0) {
            // toSend.appointments = appointments
            res.json({
                success: true,
                client: {
                    client,
                    pmtct
                },
            })
        } else {
            res.json({
                success: false,
                message: "There are no dependants on pmtct modulde for this client",
            })

        }
    } else if (!client) {
        res.json({
            success: false,
            message: "Client does not exist in the system"
        })
    }

})

router.post("/appointment/create", async(req, res) => {
    let client = await Client.findOne({
        where: {
            clinic_number: parseInt(req.body.ccc_number),
            status: 'Active',
        },
        attributes: [
            'id',
            'f_name',
            'm_name',
            'l_name',
        ],
    })
    if (client) {
        // get booked appointment where is new
        if (pmtct != 0) {
            // toSend.appointments = appointments
            res.json({
                success: true,
                client: {
                    client,
                    pmtct
                },
            })
        } else {
            res.json({
                success: false,
                message: "There are no dependants on pmtct modulde for this client",
            })

        }
    } else if (!client) {
        res.json({
            success: false,
            message: "Client does not exist in the system"
        })
    }

})

module.exports = router;