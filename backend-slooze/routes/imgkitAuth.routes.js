const express = require('express');
const ImageKit = require('@imagekit/nodejs'); 
const router = express.Router();

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

router.get('/imagekit/auth', function (req, res) {
    const { token, expire, signature } = client.helper.getAuthenticationParameters();
    res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});


module.exports = router;
