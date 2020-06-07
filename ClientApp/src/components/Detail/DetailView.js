import React, { useState, useContext, useEffect } from 'react';
import { FetchStatus, handleErrors, fetchFromApi } from '../../utils/FetchUtils';
import { Modal, ModalBody, ModalHeader, ModalFooter, Alert } from 'reactstrap';
import PageContext from '../../contexts/PageContext';
import { ElementType } from '../../utils/DetailUtils';
import { Select2 } from 'react-select2-wrapper';
import { useTranslation } from 'react-i18next';
import Relation from './Relation';
import { useHistory } from 'react-router-dom';
import Unknown from '../../routes/Unknown';
import DetailLoader from './DetailLoader';

const DetailView = ({ title, id }) => {
    const { setPageTitle, setCustomButtons } = useContext(PageContext);
    const { t } = useTranslation();
    const history = useHistory();

    const [data, setData] = useState(null);
    const [status, setStatus] = useState(FetchStatus.LOADING);

    const [values, setValues] = useState({});

    const [modalOpen, setModalOpen] = useState(false);

    const [saveResult, setSaveResult] = useState({succeeded: false, messages: []});

    useEffect(() => {
        setStatus(FetchStatus.LOADING);

        var endpoint;
        var method;
        if (id != 'new') {
            endpoint = `${title}/detail/${id}`;
            method = 'GET';
        } else {
            endpoint = `${title}/create`;
            method = 'POST';
        }

        fetchFromApi(endpoint, {
            method, headers: {
                'Content-Type': 'application/json'
            }})
            .then(handleErrors)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setStatus(FetchStatus.SUCCESS);
            })
            .catch(e => {
                console.log(e);
                setStatus(FetchStatus.FAILURE);
            });
    }, [title, id]);

    useEffect(() => {
        setCustomButtons([]);
        setPageTitle('Loading...');

        return () => {
            setPageTitle('');
            setCustomButtons([]);
        }
    }, [])

    const saveChanges = e => {
        e.preventDefault();

        var endpoint;
        var method;
        if (id != 'new') {
            endpoint = `${title}/update/${id}`;
            method = 'PUT';
        } else {
            endpoint = `${title}/create`;
            method = 'POST';
        }

        fetchFromApi(endpoint, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then(handleErrors)
            .then(r => {
                if (method == 'POST') {
                    r.json().then(entity => {
                        history.push(`/${title}/detail/${entity.id}`);
                    });
                }
            })
            .then(() => {
                setSaveResult({
                    succeeded: true,
                    messages: [t('SAVE_SUCCESS')]
                });
            })
            .catch(e => {
                setSaveResult({
                    succeeded: false,
                    messages: [e.name]
                });
            });

    }

    const confirmDelete = () => {
        fetchFromApi(`${title}/delete/${id}`, {
            method: 'DELETE',
        })
            .then(handleErrors)
            .then(() => {
                history.push(`/${title}/list`); //redirect to list view
            })
            .catch(e => {
                toggleModal();
                setSaveResult({
                    succeeded: false,
                    messages: [e.name]
                });
            });
    }

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    }

    const closeAlert = () => {
        setSaveResult({ succeeded: true, messages: [] });
    }

    useEffect(() => {
        if (data) {
            setPageTitle(data.detailTitle);

            if (!data.readOnly) {
                const buttons = [<button form="entity-form" className="anchor"><i className="icon-save"></i>{t('SAVE_CHANGES')}</button>];
                if (id != 'new') {
                    buttons.push(<button onClick={toggleModal} className="anchor"><i className="icon-trash"></i>{t('DELETE')}</button>);
                }
                setCustomButtons(buttons);
            }

            //initialize values
            const values = {};
            for (const element of data.detailElements) {
                values[element.propertyName] = element.value;
            }
            setValues(values);
        }
    }, [data])

    switch (status) {
        case FetchStatus.LOADING:
            return <DetailLoader />
        case FetchStatus.SUCCESS:
            return (
                <div id='detail-view'>
                    <Modal isOpen={modalOpen} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>
                            Potvrzení akce
                        </ModalHeader>
                        <ModalBody>
                            Skutečně chcete smazat položku?
                        </ModalBody>
                        <ModalFooter>
                            <button onClick={confirmDelete}>{t('YES')}</button>
                            <button onClick={toggleModal}>{t('NO')}</button>
                        </ModalFooter>
                    </Modal>

                    {saveResult.messages.map((m, i) => (
                        <Alert
                            key={i}
                            color={saveResult.succeeded ? 'success' : 'danger'}
                            toggle={closeAlert}
                            fade={false}
                        >
                                {m}
                        </Alert>
                    ))}

                    <div className="entity-data">
                        <form className="col-md-12" id="entity-form" onSubmit={saveChanges}>
                            {
                                data.detailElements.map((element,i) => {
                                    switch (element.elementType) {
                                        default:
                                        case ElementType.TextBox:
                                            return (
                                                <label key={i} style={{width: element.width}} >
                                                    <span>{element.caption}</span>
                                                    <input
                                                        type="text"
                                                        value={values[element.propertyName]}
                                                        onChange={e => setValues({
                                                            ...values,
                                                            [element.propertyName]: e.target.value
                                                        })}
                                                        name={element.propertyName}
                                                        readOnly={data.readOnly}
                                                    />
                                                </label>
                                            );
                                        case ElementType.DropDown:
                                            return (
                                                <Select2
                                                    key={i}
                                                    style={{ width: element.width }}
                                                    value={values[element.propertyName]}
                                                    data={[]}
                                                    onChange={e => setValues({
                                                        ...values,
                                                        [element.propertyName]: e.target.value
                                                    })}
                                                />
                                            );
                                        case ElementType.Label:
                                            return <span key={i} style={{ width: element.width }}>{values[element.propertyName]}</span>;
                                    }
                                })
                            }
                        </form>
                    </div>
                    <div className="relations">
                        {
                            data.detailCollections.map((collection, i) => (
                                <Relation data={collection} readOnly={data.readOnly} key={i} />
                            ))
                        }
                    </div>
                </div>
            );
        default:
        case FetchStatus.FAILURE:
            return <Unknown />
    }
    
}

export default DetailView;