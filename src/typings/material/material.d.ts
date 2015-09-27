/// <reference path="../../../tsd_typings/jquery/jquery.d.ts" />

declare module Material {

	interface MaterialStatic {
		init:() => any;
	}

	interface Material {
		init:() => any;
	}
}

interface JQuery {
	material:Material.Material;
}

interface JQueryStatic {
	material: Material.MaterialStatic;
}