import React, {useState} from "react";
import {FaEye} from 'react-icons/fa';

interface FieldsProps {
    field: any;
    form: any;
}

const PasswordShowHide: React.FC<FieldsProps> = ({field, form}) => {
    const [showHidePassword, changeShowHidePassword] = useState(false);

    return (
        <span>
            <FaEye onClick={() => changeShowHidePassword(!showHidePassword)}></FaEye>
        </span>
    );
};

export default PasswordShowHide;
