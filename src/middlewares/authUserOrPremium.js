function authUserOrPremium(req, res, next) {
    const userRole = req.session.role;

    if (!userRole) {
        return res.sendStatus(401);
    }
    if (userRole === "user" || userRole === "premium") {
        return next();
    } else {
        return res.sendStatus(403);
    }
}

export default authUserOrPremium;
