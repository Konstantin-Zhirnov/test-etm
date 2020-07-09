import React from 'react'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const Home = () => {
    return (
        <Container>
            <CssBaseline />
            <h2>Вопросы:</h2>
            <p>Несколько вопросов для понимания опыта:</p>
            <ol>
                <li>приходилось ли работать с функциональными компонентами?</li>
                <li>какой опыт работы с React хуками?</li>
                <li>чем отличается функциональный компонент от компонента на основе класса?</li>
                <li>с какими UI-библиотеками приходилось работать?</li>
                <li>знакомы ли с концепцией MaterialDesign?</li>
                <li>приходилось ли работать с Webpack?</li>
            </ol>
            <h2>Ответы:</h2>
            <ol>
                <li>Да. Приходилось.</li>
                <li>Полгода точно</li>
                <li>Функциональный компонент от компонента на основе класса, в первую очередь отличается методами жизненного цикла. У функционального компонента есть hoohk - useEffect. Также <b>This</b> и <b>стейт</b>.</li>
                <li>с Material UI, пробовал Ant Design</li>
                <li>Читал: <a href="https://habr.com/ru/company/redmadrobot/blog/252773/">Material Design: на Луну и обратно</a></li>
                <li>С Webpack не работал. Работал с Gulp. Create-react-app позволяет не вникать в работу сборщика.</li>
            </ol>
            </Container>
    )
}

export default Home