import { ActionIcon, AppShell, Box, Button, Drawer, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "../../../widgets/toolbar";
import {
    IconArrowBackUp,
    IconArrowForwardUp,
    IconArrowLeft,
    IconDeviceDesktop,
    IconDeviceMobile
} from "@tabler/icons-react";
import { Canvas } from "./canvas/canvas";
import { Inspector } from "./inspector/inspector";
import { builderQueries } from "../queries/builder-queries";
import { useBuilderStore } from "../model/use-builder-stoe";
import { useMediaQuery } from "@mantine/hooks";

export const CreateSites = () => {
    const navigate = useNavigate();
    const isMobileDevice = useMediaQuery('(max-width: 768px)');

    const {
        activeElementId,
        elements,
        viewMode,
        setViewMode,
        undo,
        redo,
        historyIndex,
        history,
        selectElement
    } = useBuilderStore();

    const { mutate: saveSite, isPending } = builderQueries.useSave();

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;
    const isSaveDisabled = elements.length === 0;

    return (
        <AppShell
            padding="md"
            header={{ height: 50 }}
            navbar={{ width: 50, breakpoint: 'sm' }}
            aside={{
                width: activeElementId ? 300 : 0,
                breakpoint: 'md',
                collapsed: { desktop: !activeElementId, mobile: true }
            }}
        >
            <AppShell.Header p={'xs'}>
                <Flex align={'center'} justify={'space-between'}>
                    <Flex align={'center'} gap={'lg'}>
                        <ActionIcon color={'gray'} variant="outline" onClick={() => navigate(-1)}>
                            <IconArrowLeft />
                        </ActionIcon>

                        <Flex align={'center'} gap={'xs'}>
                            <ActionIcon
                                variant={viewMode === 'desktop' ? 'filled' : 'outline'}
                                onClick={() => setViewMode('desktop')}
                            >
                                <IconDeviceDesktop />
                            </ActionIcon>
                            <ActionIcon
                                variant={viewMode === 'mobile' ? 'filled' : 'outline'}
                                onClick={() => setViewMode('mobile')}
                            >
                                <IconDeviceMobile />
                            </ActionIcon>
                        </Flex>
                    </Flex>

                    <Flex align={'center'} gap={'xs'}>
                        <ActionIcon
                            color={'gray'}
                            variant="outline"
                            onClick={undo}
                            disabled={!canUndo}
                        >
                            <IconArrowBackUp />
                        </ActionIcon>
                        <ActionIcon
                            color={'gray'}
                            variant="outline"
                            onClick={redo}
                            disabled={!canRedo}
                        >
                            <IconArrowForwardUp />
                        </ActionIcon>

                        <Button
                            loading={isPending}
                            disabled={isSaveDisabled}
                            onClick={() => saveSite({ elements })}
                            variant="filled"
                        >
                            Сохранить
                        </Button>
                    </Flex>
                </Flex>
            </AppShell.Header>

            <AppShell.Navbar>
                <Toolbar />
            </AppShell.Navbar>

            <AppShell.Main style={{
                backgroundColor: '#f8f9fa',
                backgroundImage: 'linear-gradient(to right, #e9ecef 1px, transparent 1px), linear-gradient(to bottom, #e9ecef 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                display: 'flex',
                justifyContent: 'center',
                overflowX: 'auto',
                transition: 'all 0.3s ease'
            }}>
                <Box
                    onClick={(e) => {
                        if (e.target === e.currentTarget) selectElement(null);
                    }}
                    style={{
                        width: viewMode === 'mobile' ? '450px' : '100%',
                        height: 'fit-content',
                        marginTop: viewMode === 'mobile' ? '20px' : '0',
                        marginBottom: viewMode === 'mobile' ? '20px' : '0',
                        borderRadius: viewMode === 'mobile' ? '16px' : '0',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Canvas />
                </Box>
            </AppShell.Main>

            {activeElementId && !isMobileDevice && (
                <AppShell.Aside p="md" style={{ borderLeft: '1px solid #e9ecef' }}>
                    <Inspector />
                </AppShell.Aside>
            )}

            <Drawer
                opened={!!(isMobileDevice && activeElementId)}
                onClose={() => selectElement(null)}
                position="bottom"
                size="70%"
                title="Настройки"
            >
                <Inspector />
            </Drawer>
        </AppShell>
    );
};