import s from './LinkUI.module.css';

export const LinkUI = () => {
	return (
		<a className={s['socials__link']} href='/#'>
			<img src={Viber} alt='viber' />
		</a>
	);
};
