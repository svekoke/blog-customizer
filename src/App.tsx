import { useState, useEffect } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	// применяем стили при изменении articleState
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

	return (
		<main className={styles.main}>
			<ArticleParamsForm setArticleState={setArticleState} />
			<Article />
		</main>
	);
};
