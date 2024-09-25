import '@/less/headerInfiniteAnimation.less';

import Head from "@/ts/helpers/Head.tsx";
import HeaderInfiniteAnimation from "@/ts/components/HeaderInfiniteAnimation.tsx";
import CircleChart from "@/ts/charts/CircleChart.tsx";

import { useAppDispatch, useAppSelector } from '@/redux/hooks.ts';
import { incremented, amountAdded } from '@/redux/reducers/counter/counter-slice.ts';


const DataView = () => {
    const count = useAppSelector(state => state.counter.value);
    const dispatch = useAppDispatch();

    let textFirst:string = "Statystki";
    let textSecond: string = "na Żywo";

    const handleClick = () => {
        // increment by one
        // dispatch(incremented());

        // increment by a fixed amount
        dispatch(amountAdded(3));
    }

    return (
        <>
            <Head
                title="Dane"
                description="Dane obrazujące informację na temat absolwentów uczelnii"
                keywords="Uczelnie wyższe, absolwenci uczelnii wyżyszych, najlepsze uczelnie w Polsce"
                robots="index, follow"
            />
            <section className="general-container">
                <HeaderInfiniteAnimation textFirst={textFirst} textSecond={textSecond} />
                <CircleChart />


                <button onClick={handleClick}>count is: {count}</button>
            </section>
        </>
    );
};

export default DataView;