import { Controller} from '@nestjs/common';
import { AreasService } from '../../../services/areas.service';

@Controller('areas')
export class UsersController {
  constructor(private usersService: AreasService) { }

  
}
