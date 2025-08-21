import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryService } from './cloudinary.service'
import { MulterModule } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'

@Module({
	imports: [
		ConfigModule,
		MulterModule.register({
			storage: memoryStorage()
		})
	],
	providers: [
		{
			provide: 'CLOUDINARY',
			useFactory: (configService: ConfigService) => {
				cloudinary.config({
					cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
					api_key: configService.get('CLOUDINARY_API_KEY'),
					api_secret: configService.get('CLOUDINARY_API_SECRET')
				})
				return cloudinary
			},
			inject: [ConfigService]
		},
		CloudinaryService
	],
	exports: ['CLOUDINARY', CloudinaryService, MulterModule]
})
export class CloudinaryModule {}
