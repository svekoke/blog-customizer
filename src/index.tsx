import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// состояние страницы и формы
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [draftState, setDraftState] =
		useState<ArticleStateType>(defaultArticleState);

	const [isOpen, setIsOpen] = useState(false);

	// === Логика кнопок ===
	const applySettings = () => {
		setArticleState(draftState);
		setIsOpen(false);
	};

	const resetSettings = () => {
		setArticleState(defaultArticleState);
		setDraftState(defaultArticleState);
		setIsOpen(false);
	};

	// === применяем CSS-переменные при изменении articleState ===
	useEffect(() => {
		const root = document.documentElement;
		root.style.setProperty(
			'--font-family',
			articleState.fontFamilyOption.value
		);
		root.style.setProperty('--font-size', articleState.fontSizeOption.value);
		root.style.setProperty('--font-color', articleState.fontColor.value);
		root.style.setProperty(
			'--container-width',
			articleState.contentWidth.value
		);
		root.style.setProperty('--bg-color', articleState.backgroundColor.value);
	}, [articleState]);

	const toggleSidebar = () => setIsOpen((prev) => !prev);

	return (
		<main className={clsx(styles.main)}>
			<ArticleParamsForm
				isOpen={isOpen}
				onToggle={toggleSidebar}
				draftState={draftState}
				setDraftState={setDraftState}
				onApply={applySettings}
				onReset={resetSettings}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
