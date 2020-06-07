import React, { useState, useEffect, useContext } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import VersionContext from '../../contexts/VersionContext';

const AppVersion = () => {
    const { Versions, VersionType, versions, dates, ips, fetchVersionInfo } = useContext(VersionContext);
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);

    useEffect(() => {
        fetchVersionInfo('serveradmin/version', VersionType.Version, Versions.ServerAdmin);
    }, []);

    useEffect(() => {
        if (modalOpen) {
            fetchVersionInfo('cmdservice/version', VersionType.Version, Versions.WsCmd);
            fetchVersionInfo('dataservice/version', VersionType.Version, Versions.WsData);
            fetchVersionInfo('scriptingservice/version', VersionType.Version, Versions.WsScripting);
            fetchVersionInfo('dataservice/dbversion', VersionType.Version, Versions.Db);
            fetchVersionInfo('dataservice/datalibversion', VersionType.Version, Versions.DataLib);

            fetchVersionInfo('serveradmin/builddate', VersionType.Date, Versions.ServerAdmin);
            fetchVersionInfo('cmdservice/builddate', VersionType.Date, Versions.WsCmd);
            fetchVersionInfo('dataservice/builddate', VersionType.Date, Versions.WsData);
            fetchVersionInfo('scriptingservice/builddate', VersionType.Date, Versions.WsScripting);
            fetchVersionInfo('dataservice/dbupdatedate', VersionType.Date, Versions.Db);
            fetchVersionInfo('dataservice/datalibbuilddate', VersionType.Date, Versions.DataLib);

            fetchVersionInfo('serveradmin/hostip', VersionType.Ip, Versions.ServerAdmin);
            fetchVersionInfo('cmdservice/hostip', VersionType.Ip, Versions.WsCmd);
            fetchVersionInfo('dataservice/hostip', VersionType.Ip, Versions.WsData);
            fetchVersionInfo('scriptingservice/hostip', VersionType.Ip, Versions.WsScripting);
            fetchVersionInfo('account/ip', VersionType.Ip, Versions.Client);
        }
    }, [modalOpen]);

    return (
        <React.Fragment>
            <button className="app-version" onClick={toggleModal}>{versions[Versions.ServerAdmin]}</button>
            <Modal isOpen={modalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    <span>O aplikaci Fireboxxx verze {versions[Versions.ServerAdmin]}</span>
                    <span>(build: {dates[Versions.ServerAdmin]}, IP serveru: {ips[Versions.ServerAdmin]}. IP klienta: {ips[Versions.Client]})</span>
                </ModalHeader>
                <ModalBody>
                    <p>Verze databáze {versions[Versions.Db]}</p>
                    <p>(čas updatu: {dates[Versions.Db]})</p>

                    <p>Verze FireboxxxData {versions[Versions.DataLib]}</p>
                    <p>(čas buildu: {dates[Versions.DataLib]})</p>

                    <p>Verze wsFireboxxxData {versions[Versions.WsData]}</p>
                    <p>(čas buildu: {dates[Versions.WsData]}, IP serveru: {ips[Versions.WsData]})</p>

                    <p>Verze wsFireboxxxScripting {versions[Versions.WsScripting]}</p>
                    <p>(čas buildu: {dates[Versions.WsScripting]}, IP serveru: {ips[Versions.WsScripting]})</p>

                    <p>Verze wsFireboxxxCmd {versions[Versions.WsCmd]}</p>
                    <p>(čas buildu: {dates[Versions.WsCmd]}, IP serveru: {ips[Versions.WsCmd]})</p>
                </ModalBody>
                <ModalFooter>
                    <button onClick={toggleModal}>OK</button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default AppVersion;