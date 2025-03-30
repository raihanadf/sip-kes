import { cn } from '@/lib/utils';
import logo from '../../images/logo.png';

export default function AppLogoIcon({ className }: { className?: string }) {
    return <img src={logo} alt="Logo" className={cn(className)} />;
}
