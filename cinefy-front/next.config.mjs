/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL
	},
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'www.pngmart.com' 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.mds.yandex.net',
      },
    ]
  },
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`
			}
		]
	}
};

export default nextConfig;