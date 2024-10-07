import {FC} from "react";
import {GeneralInfo} from "../../shared/types/types.ts";

interface GeneralCardInterface {
    cardInfo: null | GeneralInfo;
}

const positions = [
    "Бытовка 1",
    "Бытовка 2",
    "Умывалка",
    "Коридор и Лестница",
    "Читалка",
];

const GeneralCard: FC<GeneralCardInterface> = ({cardInfo}) => {
    if (!cardInfo) {
        //TODO ченить красиове сюда
        return <div>Empty</div>;
    }

    return (
        <div>
            <div>
                {cardInfo.GeneralInfo[0].date}
            </div>
            {positions.map((position) => (
                <div key={position} className="position">
                    <p>{position}</p>
                    {cardInfo.GeneralInfo.filter((item) => item.position === position).map((item) => (
                        <p key={item.id}>{item.room} {item.name} {item.surname}</p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GeneralCard;