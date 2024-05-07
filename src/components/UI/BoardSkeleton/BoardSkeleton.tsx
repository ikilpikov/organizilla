import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './BoardSkeleton.module.scss';
const BoardSkeleton = () => {
    return (
        <SkeletonTheme baseColor="#FFFFFF">
            <div className={styles.skeletonWrapper}>
                <div className={styles.skeletonList}>
                    <Skeleton count={1} width={90} className={styles.skeletonList__title} />
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={1}
                            width={`85%`}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={1}
                            width={`85%`}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={2}
                            width={`85%`}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                        <Skeleton
                            count={1}
                            width={`60%`}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                </div>
                <div className={styles.skeletonList}>
                    <Skeleton count={1} width={90} className={styles.skeletonList__title} />
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={2}
                            width={`85%`}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={1}
                            width={`85%`}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                        <Skeleton
                            count={1}
                            width={`35%`}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={1}
                            width={60}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={2}
                            width={`85%`}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                        <Skeleton
                            count={1}
                            width={`50%`}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                </div>
                <div className={styles.skeletonList}>
                    <Skeleton count={1} width={90} className={styles.skeletonList__title} />
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={1}
                            width={120}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={1}
                            width={60}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                    <div className={styles.skeletonList__card}>
                        <Skeleton
                            count={1}
                            width={150}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                        <Skeleton
                            count={1}
                            width={150}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                        <Skeleton
                            count={1}
                            width={80}
                            className={styles.skeletonList__text}
                            baseColor="#b8b8b8"
                        />
                    </div>
                </div>
            </div>
        </SkeletonTheme>
    );
};

export default BoardSkeleton;
