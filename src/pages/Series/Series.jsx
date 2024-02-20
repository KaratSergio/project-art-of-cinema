import { Footer } from '../../components/Footer/Footer';
import { SeriesList } from '../../components/Series/SeriesList/SeriesList'
// import scss from './Series.module.scss';

export const Series = () => {
    return (
        <section>
            <div>
                <SeriesList />
            </div>
            <Footer />
        </section>
    );
};

export default Series;
