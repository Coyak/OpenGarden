
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/app" | "/login" | "/onboarding" | "/register" | "/u" | "/u/[username]";
		RouteParams(): {
			"/u/[username]": { username: string }
		};
		LayoutParams(): {
			"/": { username?: string | undefined };
			"/app": Record<string, never>;
			"/login": Record<string, never>;
			"/onboarding": Record<string, never>;
			"/register": Record<string, never>;
			"/u": { username?: string | undefined };
			"/u/[username]": { username: string }
		};
		Pathname(): "/" | "/app" | "/login" | "/onboarding" | "/register" | `/u/${string}` & {};
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}