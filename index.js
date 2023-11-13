const express = require('express')
const joi = require('joi')
const fs = require('fs')
const app = express()

const PORT = 8080
const database = './database/db.json'
const data = JSON.parse(fs.readFileSync(database))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const handleServerError = (err) => {
    return res.status(500).json({
        message: 'Internal Server Error'
    })
}

const handleClientError = (res, status, message) => {
    return res.status(status).json({
        message
    })
}

// GET ALL DATA
app.get('/all', (req, res) => {
    try {
        return res.status(200).json({
            data: data,
            status: 'Success',
        })
    } catch (err) {
        return handleServerError(res)
    }
})


app.get('/all/:type', (req, res) => {
    try {
        const { type } = req.params
        const listType = ['tokoA', 'tokoB']

        if (!listType.includes(type)) {
            return handleClientError(res, 404, 'URL Not Found')
        }

        return res.status(200).json({
            data: data[type],
            status: 'Success',
        })
    } catch (err) {
        return handleServerError(res)
    }
})

// GET DATA BY CATEGORY (FILTER)
app.get('/all/:type/:product/:name', (req, res) => {
    try {
        const { type, product, name } = req.params
        const listType = ['tokoA', 'tokoB']

        if(!listType.includes(type) || !data[type][product].find((el) => el.name.toLowerCase() === name.toLowerCase())) {
            return handleClientError(res, 404, 'Data Not Found')
        }

        const selectedName = data[type][product].filter((el) => el.name.toLowerCase() === name.toLowerCase())
        res.status(200).json({
            data: selectedName[0],
            message: 'Success',
        })
        
    } catch (err) {
        return handleServerError(res)
    }
})

// CREATE PRODUCTS
app.post('/create/:type/:product', (req, res) => {
    try {
        const { type, product } = req.params
        const newData = req.body

        const scheme = joi.object({
            name: joi.string().min(3).required(),
            description: joi.string().required(),
        })

        const { error } = scheme.validate(newData);
        if (error) {
            return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
        }

        if (data[type][product].find((el) => el.name.toLowerCase() === newData.name.toLowerCase())) {
            return handleClientError(res, 400, 'Data Already Existed');
        }

        data[type][product].push(newData)
        fs.writeFileSync(database, JSON.stringify(data))

        return res.status(200).json({
            data: data[type][product],
            status: 'Success',
        })

    } catch (err) {
        return handleServerError(res)
    }
})

// UPDATE PRODUCTS
app.put('/all/:type/:product/:name', (req, res) => {
    try {
        const { type, product, name } = req.params;
        const newData = req.body;

        const scheme = joi.object({
            name: joi.string().min(3).required(),
            description: joi.string().required(),
        })

        const { error } = scheme.validate(newData);
        if (error) {
            return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
        }

        if (!data[type][product].find((el) => el.name.toLowerCase() === name.toLowerCase())) {
            return handleClientError(res, 404, 'Data Not Found');
        }

        const filtered = data[type][product].filter((el) => el.name.toLowerCase() !== name.toLowerCase());
        filtered.push(newData);

        data[type][product] = filtered;

        fs.writeFileSync(database, JSON.stringify(data));

        return res.status(200).json({ data: data[type][product], message: 'Success' })

    } catch (error) {
        return handleServerError(res);
    }
})

// DELETE PRODUCTS
app.delete('/all/:type/:product/:name', (req, res) => {
    try {
        const { type, product, name } = req.params;

        if (!data[type][product].find((el) => el.name.toLowerCase() === name.toLowerCase())) {
            return handleClientError(res, 404, 'Data Not Found');
        }

        const filtered = data[type][product].filter((el) => el.name.toLowerCase() !== name.toLowerCase());
        data[type][product] = filtered;
        fs.writeFileSync(database, JSON.stringify(data));

        return res.status(200).json({ data: data[type][product], message: 'Success' })
    } catch (error) {
        return handleServerError(res)
    }
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
})