import {Router} from 'express'
const router = Router();

//Database connection
import {connect} from '../database'
import { ObjectID } from 'mongodb'

router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('tasks').find({}).toArray();
    res.json(result);
});

// Create a fact
router.post('/', async (req, res) => {
    const db = await connect();
    const task = {
        title: req.body.title,
        description: req.body.description
    };
    const result = await db.collection('tasks').insert(task);
    res.json(result.ops[0])
});

// List of facts
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('tasks').findOne({ _id: ObjectID(id) });
    res.json(result);
});

// Remove a fact
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('tasks').deleteOne({ _id: ObjectID(id) });
    res.json({
        message: `Task ${id} deleted`,
        result
    })
});

// Update a fact
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateTask = {
        title: req.body.title,
        description: req.body.description
    };
    const db = await connect();
    await db.collection('tasks').updateOne({_id: ObjectID(id)}, { $set: updateTask});
    res.json({
        message: `Task ${id} Updated`
    })
});

export default router;