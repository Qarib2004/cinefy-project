export type TypeParamSlug = {
	slug: string
  }
  
  export interface IPageSlugParam {
	params: Promise<TypeParamSlug>
  }
  
  export type TypeParamId = {
	id: string
  }
  
  export interface IPageIdParam {
	params: Promise<TypeParamId>
  }