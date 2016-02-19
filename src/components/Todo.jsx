import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import Colors from 'material-ui/lib/styles/colors';

const IconButtonElement = (
	<IconButton
		touch={true}
		tooltip="Mais"
		tooltipPosition="bottom-left"
		>
		<MoreVertIcon color={Colors.grey400} />
	</IconButton>
);

const Todo = ({text, completed, id, removeTodo, onClick}) => (
	<ListItem primaryText={text} rightIconButton={
			<IconMenu iconButtonElement={IconButtonElement}>
				<MenuItem onClick={() => {removeTodo(id)}} primaryText={"Remover"} 
						leftIcon={<DeleteIcon color={Colors.grey400}/>}></MenuItem>
			</IconMenu>
		}
		leftCheckbox={<Checkbox onCheck={() => onClick(id)} defaultChecked={completed} />}>
	</ListItem>
);
export default Todo;