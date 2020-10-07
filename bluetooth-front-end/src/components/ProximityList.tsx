import React from "react";
import * as ReactTable from "react-table";
import MainController from '../controllers/MainController';
import { IBluetoothProximityDocument } from '../../../bluetooth-back-end/src/model/BluetoothProximityModel';

export const ProximityList: React.FunctionComponent<{}> = () => {
	const [data, setCurrentTableData] = React.useState<IBluetoothProximityDocument[]>([]);

	const columns = React.useMemo<ReactTable.Column<IBluetoothProximityDocument>[]>(() => [
		{
			id: 'deviceId1',
			Header: "Device Id 1",
			accessor: x => { return x.first ? x.first.deviceId : '(undefined)'; }
		},
		{
			id: 'deviceId2',
			Header: "Device Id 2",
			accessor: x => { return x.second ? x.second.deviceId : '(undefined)'; }
		},
		{
			id: 'signalStrenth',
			Header: "Signal Strength",
			accessor: 'signalStrenth',
		},
	], []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = ReactTable.useTable<IBluetoothProximityDocument>(
		{
			columns,
			data,
		},
	);

	React.useEffect(() => {
		loadTableData();
	}, []);

	const loadTableData = async () => {
		const result = await MainController.getProximities();
		setCurrentTableData(result.data);
	};

	const onDeleteAll = async (event: React.FormEvent<HTMLInputElement>) => {
		await MainController.deleteProximities();
		await loadTableData();
	}

	return (
		<>
			<table {...getTableProps()}>
				<thead>
					{headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th {...column.getHeaderProps()}>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map(row => {
						prepareRow(row)
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map(cell => {
									return (
										<td
											{...cell.getCellProps()}
										>
											{cell.render('Cell')}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
			<input value="Delete all" type="button" onClick={onDeleteAll} />
		</>
	);
}
