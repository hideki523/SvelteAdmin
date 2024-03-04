import Book from 'carbon-icons-svelte/lib/Book.svelte';
import Home from 'carbon-icons-svelte/lib/Home.svelte';
import Document from 'carbon-icons-svelte/lib/Document.svelte';
import Menu from 'carbon-icons-svelte/lib/Menu.svelte';
import Switcher from 'carbon-icons-svelte/lib/Switcher.svelte';

import { DashboardDefinition, CallbackAction, UrlAction, Submenu, themes } from '$lib';

import fr from './translations/fr';
import { bookCrud } from './BookCrud';
import { testCrud } from './TestCrud';

let newLinkIndex = 1;

const dynamicallyCustomizable: Submenu = new Submenu('Dynamic menu', Switcher, [
	new CallbackAction('Add a new link to the menu', null, () => {
		dashboard.stores.topRightMenu.update((links) => {
			dynamicallyCustomizable.links.push(new UrlAction('Custom link' + newLinkIndex++, '/'));
			return [...links];
		});
	})
]);

export const dashboard = new DashboardDefinition({
	adminConfig: {
		defaultLocale: 'en',
		autoCloseSideMenu: false,
		rootUrl: '/admin',
		head: {
			brandName: 'Svelte Admin',
			appName: 'Demo'
		},
		theme: themes.carbon
	},
	sideMenu: [
		new UrlAction('Homepage', '/', Home),
		new UrlAction('Books', '/admin/books/list', Book),
		new CallbackAction('Callback link', null, () => {
			alert('Hey, this link is called with Javascript!');
		}),
		new Submenu('Submenu', null, [
			new UrlAction('Submenu 1', '#', Book),
			new UrlAction('Submenu 2', '#', Book)
		])
	],
	topLeftMenu: [
		new UrlAction('API Docs', '/apidocs', Document, { htmlAttributes: { rel: 'external' } })
	],
	topRightMenu: [
		new UrlAction('Single menu link', '/'),
		new CallbackAction('Single menu callback', null, () => {
			alert('Hey, this link is called with Javascript too!');
		}),

		new Submenu('Specific submenu', Menu, [
			new UrlAction('Submenu item 1', '/', Book),
			new UrlAction('Submenu item 2', '/', Book)
		]),
		dynamicallyCustomizable
	],
	localeDictionaries: {
		fr: fr
	},
	cruds: [bookCrud, testCrud]
});
