import { useRef } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	isOpen: boolean;
	onToggle: () => void;
	draftState: ArticleStateType;
	setDraftState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
	onApply: () => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	draftState,
	setDraftState,
	onApply,
	onReset,
}: Props) => {
	const asideRef = useRef<HTMLDivElement>(null);

	// 🔹 Закрытие меню при клике снаружи
	useOutsideClickClose({
		isOpen,
		onChange: () => {
			if (isOpen) onToggle();
		},
		rootRef: asideRef,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={draftState.fontFamilyOption}
						onChange={(option) =>
							setDraftState((prev) => ({ ...prev, fontFamilyOption: option }))
						}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={draftState.fontSizeOption}
						onChange={(option) =>
							setDraftState((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>

					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={draftState.fontColor}
						onChange={(option) =>
							setDraftState((prev) => ({ ...prev, fontColor: option }))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={draftState.backgroundColor}
						onChange={(option) =>
							setDraftState((prev) => ({ ...prev, backgroundColor: option }))
						}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={draftState.contentWidth}
						onChange={(option) =>
							setDraftState((prev) => ({ ...prev, contentWidth: option }))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
