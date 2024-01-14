let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/waters-tracker');

let waterSchema = new mongoose.Schema({
    dateWater: Date,
    volume: Number,
    waterType: String,
    waterTemperature: Number,
    anythingOtherWater: Boolean,
    commment: String,
})

let Water = mongoose.model('water', waterSchema);

app.post('/new', async function (req, res) {
    let inputlist = req.body.inputlist;
    let water = new Water({
        dateWater: inputlist.dateWater,
        volume: inputlist.volume,
        waterType: inputlist.waterType,
        waterTemperature: inputlist.waterTemperature,
        anythingOtherWater: inputlist.anythingOtherWater,
        commment: inputlist.commment,
    });
    await water.save();
    res.send(200);
});

app.post('/records', async function (req, res) {
    let waters = await Water.find()
                            .sort({dateWater: -1});
    res.send(waters);
});

app.post('/statistics-week', async function (req, res) {
    let week = req.body.week;
    let waters = await Water.find({dateWater: {$gte: week}})
    res.send(waters);
});
app.post('/statistics-month', async function (req, res) {
    let month = req.body.month;
    let waters = await Water.find({dateWater: {$gte: month}})
    res.send(waters);
});