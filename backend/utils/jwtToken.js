export const attachCookiesToResponse = (user, res) => {

    let token = user?.getJWTToken();

    let oneDay = 24 * 60 * 60 * 1000;
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * oneDay
        ),
        partitioned: true,
    };
    res.cookie('token', token, options);
};
