import React from "react";
import * as ReactTable from "react-table";
import MainController from '../controllers/MainController';
import { IBluetoothMsgDocument } from '../../../bluetooth-back-end/src/model/BluetoothMsgModel'

interface IBluetoothMsgCtrl extends IBluetoothMsgDocument {
	selected: string;
}

export const MessageList: React.FunctionComponent<{}> = () => {
	const [data, setCurrentTableData] = React.useState<IBluetoothMsgCtrl[]>([]);
	
	const handleSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log('here');
	};

	const columns = React.useMemo<ReactTable.Column<IBluetoothMsgCtrl>[]>(() => [
		{
			Header: "Device Id",
			accessor: 'deviceId'
		},
		{
			id: 'selected',
			Header: "Selected",
			accessor: 'selected',
			//accessor: x => <input id={x.deviceId} value={x.selected} onChange={handleSelected} />, // type="checkbox"
			render: (x: any) => { return 'bbbb'},
		},
	], []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		rows,
	} = ReactTable.useTable<IBluetoothMsgCtrl>(
		{
			columns,
			data,
		},
	);

	React.useEffect(() => {
		MainController.getMessages().then(result => {
			let dat = result.data.map(x => ({ ...x, selected: "aaa"} as IBluetoothMsgCtrl)); // syntax sugar to add a field to array of Objects
			setCurrentTableData(dat);
		});
	}, []);

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
		</>
	);
}
