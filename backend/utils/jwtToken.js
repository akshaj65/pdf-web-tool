export const attachCookiesToResponse = (user, res) => {

    let token = user?.getJWTToken();
    console.log(token);

    let oneDay = 24 * 60 * 60 * 1000;
    const options = {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * oneDay
        ),
    };
    res.cookie('token', token, options);
};
