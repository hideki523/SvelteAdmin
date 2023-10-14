import type { ComponentType } from 'svelte';
import type { FieldInterface } from './Field';
import TabsFieldComponent from '../Crud/FieldComponents/TabsField.svelte';
import type { Options } from './Options';

export type TabOptions = Options & {
	headerType: 'default' | 'container';
};

export class TabsField implements FieldInterface<TabOptions> {
	public readonly name: string;
	public readonly label: string;
	public readonly fields: Array<FieldInterface<Options>>;
	public readonly options: Partial<TabOptions>;
	public readonly formComponent: ComponentType = TabsFieldComponent;

	constructor(
		name: string,
		label: string = '',
		fields: Array<FieldInterface<Options>> = [],
		options: TabOptions = {} as TabOptions
	) {
		this.name = name;
		this.label = label ? label : name;
		this.fields = fields;
		this.options = options || {};
	}
}
