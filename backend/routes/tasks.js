const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

//Recuperer les taches de user
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({user : req.user.id});
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message : 'Error serveur'});
    }
});
//Ajouter une tache
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title, user: req.user.id,
        })
        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message : 'Error serveur'});
    }
});
//Supprimer une tache
router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await Task.deleteOne({ _id: req.params.id, user: req.user.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Tache non trouvée ou non autorisée' });
        }
        res.json({ message: 'Tache supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error serveur lors de la suppression' });
    }
});
module.exports = router;