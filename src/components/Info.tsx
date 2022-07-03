import React, {useEffect, useState, useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import * as UserService from "../services/user.service";
import GridTable from "./GridTable";
// import Table from "./Table";
import './info.css'

const Info: React.FC = () => {
    const personalDetails = useSelector((state: RootState) => state.user.personalDetails)
    const [projectsList, setProjectsList] = useState<any>([]);
    const columns = useMemo(
        () => [
            {
                Header: "Projects",
                columns: [
                    {
                        Header: "id",
                        accessor: "id"
                    },
                    {
                        Header: "name",
                        accessor: "name"
                    },
                    {
                        Header: "score",
                        accessor: "score"
                    },
                    {
                        Header: "durationInDays",
                        accessor: "durationInDays"
                    },
                    {
                        Header: "bugsCount",
                        accessor: "bugsCount"
                    },
                    {
                        Header: "madeDeadline",
                        accessor: "madeDadeline"
                    }
                ]
            }
        ],
        []
    );

    useEffect(() => {
        UserService.getUserInfo().then(
            (data) => {
                setProjectsList(data.data)
            }
        ).catch((err) => console.log(err))
    }, []);


    return (
        <div className="container info-wrapper">
            <header className="jumbotron">
                <h3>
                    <strong> Info</strong>
                </h3>
            </header>
            <div className="row">
                <div className="col-md">
                    <div className="card card-container">
                        <img
                            src={personalDetails.avatar}
                            alt="info-img"
                            className="info-img-card"
                        />
                        <div className="card-body">
                            <h5 className="card-title"><strong> Name:</strong> {personalDetails.name}</h5>
                            <p className="card-text"><strong> Team:</strong> {personalDetails.Team}</p>
                            <p className="card-text"><strong> joinedAt:</strong> {personalDetails.joinedAt}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-md">
                {/*<Table columns={columns} data={projectsList}/>*/}
                {/*<TryTable></TryTable>*/}
                <GridTable columns={columns} data={projectsList}></GridTable>
            </div>
        </div>
    );
};



export default Info;
