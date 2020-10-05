import React from "react";
import * as ReactTable from "react-table";
import MainController from '../controllers/MainController';
import { IBluetoothMsgDocument } from '../../../bluetooth-back-end/src/model/BluetoothMsgModel';
import { IBluetoothProximityDocument, IBluetoothProximity } from '../../../bluetooth-back-end/src/model/BluetoothProximityModel';
import * as Util from '../util/Util';

interface IBluetoothMsgCtrl extends IBluetoothMsgDocument {
	selected: boolean;
};

export const MessageList: React.FunctionComponent<{}> = () => {
	const [data, setCurrentTableData] = React.useState<IBluetoothMsgCtrl[]>([]);
	const [signalStrength, setSignalStrength] = React.useState<string>("1.1");
	const [validForm, setValidForm] = React.useState<boolean>(true);

	const columns = React.useMemo<ReactTable.Column<IBluetoothMsgCtrl>[]>(() => [
		{
			Header: "Device Id",
			accessor: 'deviceId',
		},
		{
			id: 'selected',
			Header: "Selected",
			accessor: 'selected',
			Cell: (cell: ReactTable.Cell<IBluetoothMsgCtrl>) => {
				return (<input type="checkbox"
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						event.persist();
						setCurrentTableData(old => {
							let n = [...old];
							n[cell.row.index].selected = event.target.checked;
							return n;
						});
					}} />);
			}
		},
	], []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = ReactTable.useTable<IBluetoothMsgCtrl>(
		{
			columns,
			data,
		},
	);

	React.useEffect(() => {
		MainController.getMessages().then(result => {
			// add a field to array of Objects
			let dat = result.data.map(x => ({ ...x, selected: false } as IBluetoothMsgCtrl));
			setCurrentTableData(dat);
		});
	}, []);

	const onChangeSignalStrength = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSignalStrength(event.target.value);
		setValidForm(Util.isNumeric(event.target.value));
	}

	const onSubmit = async (event: React.FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		setValidForm(false);
		for (let i = 0; i < data.length - 1; i++) {
			for (let j = i + 1; j < data.length; j++) {
				if (data[i].selected && data[j].selected) {
					await MainController.addProximity({
						first: data[i] as IBluetoothMsgDocument,
						second: data[j] as IBluetoothMsgDocument,
						signalStrenth: parseFloat(signalStrength),
					});
				}
			}
		}
		setValidForm(true);
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
			<input type="text" value={signalStrength} onChange={onChangeSignalStrength} />
			<input type="submit" onClick={onSubmit} disabled={!validForm} />
		</>
	);
}
