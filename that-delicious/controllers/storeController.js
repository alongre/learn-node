const mongoose = require('mongoose');
const Store = mongoose.model('Store')

exports.homepage = (req, res) => {
    res.render('index');
}

exports.addStore = (req, res) => {
    res.render('editStore', {title: 'Add Store'});
}

exports.createStore = async (req, res) => {
    const store = await(new Store(req.body)).save();
    req.flash('success', `Successfully created ${store.name}. Care to leave a review?`)
    res.redirect(`/store/${store.slug}`)
    console.log(`${store.name} was saved successfully`);
}

exports.getStores = async (req, res) => {
    const stores = await Store.find();
    console.log(stores);
    res.render('stores', { title : 'Stores', stores})
}

exports.editStore = async (req, res) => {
    const store = await Store.findOne({ _id: req.params.id })
    res.render('editStore', { title: `Edit ${store.name}`, store})

} 

exports.updateStore = async (req, res) => {
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, //return the new store instead of old one
        runValidators: true
    }).exec();
    req.flash('success', `Successfullly updated <strong>${store.name}</strong>. 
    <a href="/stores/${store.slug}">View Store -></a>`);
    res.redirect(`/stores/${store._id}/edit`);
}