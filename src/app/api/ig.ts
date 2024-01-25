import axios from 'axios';

const accessToken = 'TU_TOKEN_DE_ACCESO'; // Reemplaza con tu propio token de acceso

async function getInstagramImages() {
    try {
        const response = await axios.get(
            `https://graph.instagram.com/v12.0/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`
        );

        const posts = response.data.data;
        const images = posts.map((post: any) => post.media_url);

        return images;
    } catch (error) {
        return [];
    }
}