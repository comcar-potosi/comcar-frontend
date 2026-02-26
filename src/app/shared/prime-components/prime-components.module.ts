import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { MenubarModule } from 'primeng/menubar';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { FieldsetModule } from 'primeng/fieldset';
import { SidebarModule } from 'primeng/sidebar';
import { ColorPickerModule } from 'primeng/colorpicker';
import { PickListModule } from 'primeng/picklist';
import { FileUploadModule } from 'primeng/fileupload';
import { SliderModule } from 'primeng/slider';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { ListboxModule } from 'primeng/listbox';
import { TimelineModule } from 'primeng/timeline';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AccordionModule } from 'primeng/accordion';
import { SplitterModule } from 'primeng/splitter';
import { AutoFocusModule } from 'primeng/autofocus';
import { FocusTrapModule } from 'primeng/focustrap';
import { DragDropModule } from 'primeng/dragdrop';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { DatePickerModule } from 'primeng/datepicker';
import { SpeedDialModule } from 'primeng/speeddial';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from "primeng/floatlabel"
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TabsModule } from 'primeng/tabs';
import { StepperModule } from 'primeng/stepper';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';

@NgModule({
  imports: [
    FloatLabel
  ],
  exports: [
    ToastModule,
    StepperModule,
    DatePickerModule,
    FloatLabel,
    ToggleSwitchModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    IconFieldModule,
    ScrollPanelModule,
    InputIconModule,
    SkeletonModule,
    CheckboxModule,
    SplitButtonModule,
    MenubarModule,
    FieldsetModule,
    TextareaModule,
    TableModule,
    ChipModule,
    ToolbarModule,
    DialogModule,
    BadgeModule,
    SidebarModule,
    ColorPickerModule,
    PickListModule,
    FileUploadModule,
    SliderModule,
    EditorModule,
    InputNumberModule,
    StepsModule,
    CardModule,
    PasswordModule,
    ListboxModule,
    TimelineModule,
    ToggleButtonModule,
    InputSwitchModule,
    AccordionModule,
    SplitterModule,
    AutoFocusModule,
    AutoCompleteModule,
    FocusTrapModule,
    DragDropModule,
    MenuModule,
    TabMenuModule,
    SpeedDialModule,
    OverlayBadgeModule,
    MultiSelectModule,
    TabsModule,
    RatingModule,
    SelectButtonModule,
    TooltipModule,
    SelectModule,
    ConfirmDialogModule,
    IftaLabelModule
  ]
})
export class PrimeComponentsModule { }
