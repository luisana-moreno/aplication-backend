import jwt  from "jsonwebtoken";
const TOKEN_SECRET = process.env.TOKEN_SECRET;

export function generateToken(payload) {
    return new Promise ((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {expiresIn: '1h'},
            (err, token) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            }
        )
    });
}