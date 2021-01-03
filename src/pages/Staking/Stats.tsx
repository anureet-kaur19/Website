import React from 'react';
import denominate from '../../components/Denominate/denominate';
import { decimals, denomination } from '../../config';

interface StatsType {
    title: string;
    value: React.ReactNode;
    cardBg: string;
    dataTestId?: string;
}
const usdValue = ({ amount, usd }: { amount: string; usd: number }) => {
    const sum = (parseFloat(amount) * usd).toFixed(2);
    return parseFloat(sum).toLocaleString('en', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });
};


const UsdValue = ({
    input,
    className = '',
    dataTestId = '',
}: {
    input: string;
    className?: string;
    dataTestId?: string;
}) => {
    return (
        <>
            <small className={className} data-testid={dataTestId}>
                {isNaN(parseFloat(input)) ? (
                    '...'
                ) : (
                        <>
                            $
              {usdValue({
                            amount: denominate({
                                input,
                                denomination,
                                decimals,
                                showLastNonZeroDecimal: false,
                                addCommas: false,
                            }),
                            usd: 25,
                        })}
                        </>
                    )}
            </small>
        </>
    );
};

export default class Stats extends React.Component<{ entries: StatsType[]; title?: string }> {
    static UsdValue = UsdValue;

    render() {
        return (
            <div className="row stats">
                <div className="col-12 mb-spacer">
                    <div className="card card-small">
                        {this.props.title && (
                            <div className="card-header border-bottom">
                                <h6 className="m-0">{this.props.title}</h6>
                            </div>
                        )}
                        <div className="card-body d-flex flex-wrap p-3">
                            {this.props.entries.map((entry) => (
                                <div
                                    data-testid={entry.dataTestId}
                                    key={entry.title}
                                    className={`stats-card p-4 m-2 d-flex flex-column ${entry.cardBg}`}
                                >
                                    <small className="text-uppercase mb-3 text-nowrap">{entry.title}</small>
                                    {entry.value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
