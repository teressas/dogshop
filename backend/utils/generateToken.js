import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' })

    // res.cookie() is used to set a cookie named name with a value of value, and it specifies that the cookie should expire after 30 days and be httpOnly.
    res.cookie('jwt', token, {
        httpOnly: true, 
        // mitigate the risk of client-side script accessing the stored cookie. 
        // recommended security practice for cookies holding sensitive information like tokens.
        secure: process.env.NODE_ENV !== 'development',
        // ensures that the cookie is sent over HTTPS, reducing the risk of man-in-the-middle attacks. In development (usually not HTTPS), it allows for easier testing by not enforcing this attribute.
        sameSite: 'strict', 
        // protection against CSRF (Cross-Site Request Forgery) attacks by restricting the cookie from being sent in cross-site requests.
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days, simple token expiration handling
    })
}
export default generateToken