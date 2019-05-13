module.exports = (req, res, next) => {
    if (req.userData.sub !== req.params.id) {
        return res.status(401).send({
            error: 'Unauthorized',
        });
    }

    next();
};
