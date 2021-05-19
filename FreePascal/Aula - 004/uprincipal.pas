unit uPrincipal;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls;

type

  { TfrmAula004 }

  TfrmAula004 = class(TForm)
    btnProcessa: TButton;
    Memo1: TMemo;
    procedure btnProcessaClick(Sender: TObject);
  private

  public

  end;

var
  frmAula004: TfrmAula004;

implementation

{$R *.lfm}

{ TfrmAula004 }

procedure TfrmAula004.btnProcessaClick(Sender: TObject);
var
  cNomeDiaDaSemana : array[1..7] of string = ('Domingo' , 'Segunda' , 'Terça' , 'Quarta' , 'Quinta' , 'Sexta' , 'Sabado');
begin

end;

end.

