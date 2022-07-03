import React, {useState, useEffect, useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import * as UserService from "../services/user.service";
import {ColDef} from "ag-grid-community";
import {AxiosResponse} from "axios";

interface GridTableProps {
    columns: any,
    data: any
}

const GridTable: React.FC<GridTableProps> = () => {
    const [rowData, setRowData] = useState();
    const [projectsPercentage, setProjectsPercentage] = useState<string>();
    const [averageScores, setAverageScores] = useState<string>();

    const [columnDefs] = useState(
        [
            {field: 'id', filter: true, sortable: true},
            {field: 'name', filter: true, sortable: true},
            {field: 'score', filter: true, sortable: true},
            {field: 'durationInDays', filter: true, sortable: true},
            {field: 'bugsCount', filter: true, sortable: true},
            {
                field: 'madeDeadline', filter: true, sortable: true,
                cellRenderer: (params: any) => {
                    return params.data.madeDadeline.toString();
                }
            },
        ]);

    useEffect(() => {
        UserService.getUserInfo()
            .then((data: AxiosResponse) => {
                processData(data.data, true);
                return setRowData(data.data)
            })
            .catch((err) => console.log(err))
    }, []);

    const getRowStyle = (params: any) => {
        if (params.data.score < 70) {
            return {backgroundColor: '#f8d7da'};
        }
        if (params.data.score > 90)
            return {backgroundColor: '#d4edda'};
    };

    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
        };
    }, []);

    const processData = (e: any, isLoad: boolean = false) => {
        let sumDeadlineProjects = 0;
        let sumAllScores = 0;
        let sumAllProjects = 0;
        if (isLoad)
            e.forEach(function (node: any) {
                if (node.madeDadeline === true)
                    sumDeadlineProjects += 1;
                sumAllScores += node.score;
                sumAllProjects += 1;
            });
        else
            e.api.forEachNodeAfterFilterAndSort(function (node: any) {
                if (node.data.madeDadeline === true)
                    sumDeadlineProjects += 1;
                sumAllScores += node.data.score;
                sumAllProjects += 1;
            });
        setProjectsPercentage(((sumDeadlineProjects / sumAllProjects) * 100).toString());
        setAverageScores((sumAllScores / sumAllProjects).toString());
    }
    return (
        <div>
            <div className="row">
                <div className="alert alert-primary col-6" role="alert">
                    Deadline projects percentage - {projectsPercentage}%
                </div>
                <div className="alert alert-warning col-6" role="alert">
                    Average project scores - {averageScores}
                </div>
            </div>
            <div className="ag-theme-alpine" style={{height: 500}}>
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        rowHeight={60}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        getRowStyle={getRowStyle}
                        defaultColDef={defaultColDef}
                        onFilterChanged={processData}
                    />
                </div>
            </div>
        </div>
    );
}

export default GridTable;
