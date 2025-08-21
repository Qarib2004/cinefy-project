import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ActorService } from './actor.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}
  @Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getAll(searchTerm)
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.actorService.getBySlug(slug)
	}

	/*request for admin*/

	@Get('by-id/:id')
async getById(@Param('id') id: string) {
  const actor = await this.actorService.getById(id);
  if (!actor) throw new NotFoundException('actor not found');
  return actor;
}


	@UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async crate() {
		return this.actorService.create()
	}

	@UsePipes(new ValidationPipe())
	@Put('/:id')
	@HttpCode(200)
	@Auth('admin')
	async update(@Param('id') id: string, @Body() dto: UpdateActorDto) {
		const updatedActor = await this.actorService.update(id, dto)
		if (!updatedActor) {
			throw new NotFoundException('actor not found')
		}

		return updatedActor
	}

	@Delete('/:id')
	@Auth('admin')
	async delete(@Param('id') id: string) {
		const deleteddActor = await this.actorService.delete(id)
		if (!deleteddActor) {
			throw new NotFoundException('actor not found')
		}

		return deleteddActor
	}
}
