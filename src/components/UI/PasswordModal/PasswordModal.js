import React, { useState } from 'react';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';

const passwordModal = (props) => {

    const [pwd, setPwd] = useState('');

    const inputChangedHandler = (event, key) => {
      setPwd(event.target.value);
    }

    return (
      <Modal show={props.show} modalClosed={()=>props.cancelHandler(false)}>
        <Input
              key='password'
              elementType='input'
              elementConfig={{type: 'password'}}
              value={pwd}
              invalid={false}
              shouldValidate={false}
              touched={false}
              label="Пароль"
              changed={(event) => inputChangedHandler(event, 'password')}
              blur={(event) => {}}/>
              <Button
                    btnType="Danger"
                    clicked={()=>props.confirmHandler(pwd)}
                    type="button"
                    >Подтвердить</Button>
                <Button
                    btnType="Success"
                    type="button"
                    clicked={()=>props.cancelHandler(false)}>Отменить</Button>
      </Modal>
    )
}

export default passwordModal;
